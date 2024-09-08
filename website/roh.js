document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('userList');
    const addUserButton = document.getElementById('addUserButton');
    const addUserModal = document.getElementById('addUserModal');
    const closeModalButton = document.getElementById('closeModal');
    const addUserForm = document.getElementById('addUserForm');
  
    // Function to fetch and display users
    const fetchUsers = async () => {
      try {
        const response = await fetch('/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const users = await response.json();
        userList.innerHTML = ''; // Clear existing user cards
        users.forEach(user => {
          const userCard = document.createElement('div');
          userCard.className = 'user-card';
          userCard.innerHTML = `
            <h3 class="user-name">${user.name}</h3>
            <p class="user-info">Age: ${user.age}</p>
            <p class="user-info">Last Month Paid: ${user.lastMonthPaid}</p>
            <button class="paid-button" data-id="${user.id}">Paid</button>
          `;
          userList.appendChild(userCard);
        });
  
        // Attach event listeners to "Paid" buttons
        document.querySelectorAll('.paid-button').forEach(button => {
          button.addEventListener('click', handlePaidClick);
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    // Function to handle "Paid" button click
    const handlePaidClick = async (event) => {
      const userId = event.target.getAttribute('data-id');
      try {
        const response = await fetch(`/users/paid/${userId}`, {
          method: 'POST',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.text();
        console.log(result);
        fetchUsers(); // Refresh user list after update
      } catch (error) {
        console.error('Error updating user:', error);
      }
    };
  
    // Function to handle "Add New User" button click
    const handleAddUserClick = () => {
      addUserModal.style.display = 'block';
    };
  
    // Function to handle form submission
    const handleAddUserFormSubmit = (event) => {
      event.preventDefault();
      
      const name = document.getElementById('name').value;
      const age = parseInt(document.getElementById('age').value, 10);
  
      // Create headers and request options
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      const raw = JSON.stringify({ name, age });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
  
      // Perform the fetch request
      fetch("http://localhost:9000/signup", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result);
          fetchUsers(); // Refresh user list after adding new user
          addUserModal.style.display = 'none'; // Close the modal
          addUserForm.reset(); // Clear the form fields
        })
        .catch(error => console.error('Error adding user:', error));
    };
  
    // Function to handle closing the modal
    const handleCloseModal = () => {
      addUserModal.style.display = 'none';
      addUserForm.reset(); // Clear the form fields
    };
  
    // Attach event listener to "Add New User" button
    addUserButton.addEventListener('click', handleAddUserClick);
  
    // Attach event listener to form submit
    addUserForm.addEventListener('submit', handleAddUserFormSubmit);
  
    // Attach event listener to close button
    closeModalButton.addEventListener('click', handleCloseModal);
  
    // Initial fetch of users
    fetchUsers();
  });
  