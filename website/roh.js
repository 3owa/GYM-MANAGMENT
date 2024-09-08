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
            const response = await fetch("http://localhost:9001/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, age })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            
            addUserModal.style.display = 'none'; // Close the modal
            addUserForm.reset(); // Clear form fields
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding user: ' + error.message);
        }
    });
});