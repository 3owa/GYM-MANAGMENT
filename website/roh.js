document.addEventListener('DOMContentLoaded', () => {
    const userList = document.getElementById('userList');
    const addUserButton = document.getElementById('addUserButton');
    const addUserModal = document.getElementById('addUserModal');
    const closeModalButton = document.getElementById('closeModal');
    const addUserForm = document.getElementById('addUserForm');

    // Function to handle "Add New User" button click
    const handleAddUserClick = () => {
        console.log('Add New User button clicked');
        addUserModal.style.display = 'block';
    };

    // Function to handle form submission
    const handleAddUserFormSubmit = async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value, 10);

        console.log('Form submitted with:', { name, age });

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ name, age });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch("https://gym-managment-riyu.onrender.com/signup", requestOptions);
        
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const result = await response.text();
            console.log(result);
            addUserModal.style.display = 'none'; // Close the modal
            addUserForm.reset(); // Clear the form fields
        
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Error adding user: ' + error.message);
        } finally{}
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        console.log('Close modal button clicked');
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
