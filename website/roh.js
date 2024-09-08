document.addEventListener('DOMContentLoaded', () => {
    const addUserButton = document.getElementById('addUserButton');
    const addUserModal = document.getElementById('addUserModal');
    const closeModalButton = document.getElementById('closeModal');
    const addUserForm = document.getElementById('addUserForm');

    // Show modal when "Add User" button is clicked
    addUserButton.addEventListener('click', () => {
        addUserModal.style.display = 'block';
    });

    // Close modal when "Close" button is clicked
    closeModalButton.addEventListener('click', () => {
        addUserModal.style.display = 'none';
        addUserForm.reset();
    });

    // Handle form submission
    addUserForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const age = parseInt(document.getElementById('age').value.trim(), 10);

        if (!name || isNaN(age)) {
            alert('Please provide a valid name and age.');
            return;
        }

        try {
            const response = await fetch("https://gym-managment-riyu.onrender.com/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, age })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            fetchUsers();
            addUserModal.style.display = 'none'; // Close the modal
            addUserForm.reset(); // Clear form fields
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding user: ' + error.message);
        }
    });



    fetchUsers();

    // Function to fetch users from the server
    async function fetchUsers() {
      try {
        const response = await fetch('https://gym-managment-riyu.onrender.com/users'); // Replace with your actual backend URL
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
  
        const users = await response.json();
        displayUsers(users); // Call function to display users
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to load users');
      }
    }
  
    // Function to display users in the user list
    function displayUsers(users) {
      const userList = document.getElementById('userList');
      userList.innerHTML = ''; // Clear any existing content
  
      // Loop through users and create cards
        Object.keys(users).forEach(userId => {
        const user = users[userId];
  
        const userCard = document.createElement('div');
        userCard.classList.add('user-card');
        userCard.innerHTML = `
          <h3>${user.name}</h3>
          <p>Age: ${user.age}</p>
          <p>Sign-up Date: ${user.signDate}</p>
          <p>Last Month Paid: ${user.lastMonthPaid || 'N/A'}</p>
          <button class="paid-button" data-user-id="${userId}">Paid</button>
        `;
        userList.appendChild(userCard);
      });


      const paidButtons = document.querySelectorAll('.paid-button');
            paidButtons.forEach(button => {
            button.addEventListener('click', handlePaidButtonClick);
    });

}


  // Function to handle the "Paid" button click
  async function handlePaidButtonClick(event) {
    const userId = event.target.getAttribute('data-user-id');

    try {
      const response = await fetch(`https://gym-managment-riyu.onrender.com/users/paid/${userId}`, {
        method: 'POST'
      });

      if (!response.ok) {
        throw new Error('Failed to update payment status');
      }

      // Refresh the user list to show the updated payment info
      fetchUsers();
    } catch (error) {
      console.error('Error updating payment status:', error);
      alert('Failed to update payment status');
    }
  }

});