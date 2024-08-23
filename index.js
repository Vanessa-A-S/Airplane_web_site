document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const reserveForm = document.getElementById('reserveForm');

    // Vérifiez que les éléments existent
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/login', {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    document.getElementById('login').style.display = 'none';
                    document.getElementById('reserve').style.display = 'block';
                } else {
                    alert('Invalid login credentials');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    // Vérifiez que les éléments existent
    if (reserveForm) {
        reserveForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(reserveForm);
            const data = Object.fromEntries(formData.entries());

            try {
                const response = await fetch('/reserve', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('Reservation successful');
                } else {
                    alert('Error making reservation');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            document.querySelectorAll('section').forEach(section => {
                section.style.display = section.id === targetSection ? 'block' : 'none';
            });
        });
    });
});