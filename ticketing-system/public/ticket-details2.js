const ticketDetailsContainer = document.getElementById('ticketDetailsContainer');
const approveButton = document.getElementById('approveButton');
const cancelButton = document.getElementById('cancelButton');
let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
let viewingTicketId = localStorage.getItem('viewingTicketId');

function renderTicketDetails() {
    ticketDetailsContainer.innerHTML = '';
    const ticket = tickets.find(t => t.id === viewingTicketId);
    if (ticket) {
        const ticketDetails = `
            <p><strong>Ticket ID:</strong> ${ticket.id}</p>
            <p><strong>Requester Name:</strong> ${ticket.requesterName}</p>
            <p><strong>Project Field:</strong> ${ticket.projectField}</p>
            <p><strong>Comment:</strong> ${ticket.comment}</p>
            <p><strong>Attachments:</strong></p>
            <ul>
                ${ticket.attachments.map(att => `<li><a href="${att.url}" target="_blank">${att.name}</a></li>`).join('')}
            </ul>
            <p><strong>Status:</strong> ${ticket.status}</p>
        `;
        ticketDetailsContainer.innerHTML = ticketDetails;
    }
}

approveButton.addEventListener('click', function() {
    const ticket = tickets.find(t => t.id === viewingTicketId);
    ticket.status = 'Approved';
    ticket.timestamp = new Date().getTime(); // Add timestamp
    localStorage.setItem('tickets', JSON.stringify(tickets));
    window.location.href = 'approver2.html';
});

cancelButton.addEventListener('click', function() {
    const ticket = tickets.find(t => t.id === viewingTicketId);
    ticket.status = 'Cancelled';
    ticket.timestamp = new Date().getTime(); // Add timestamp
    localStorage.setItem('tickets', JSON.stringify(tickets));
    window.location.href = 'approver2.html';
});

window.onload = renderTicketDetails;

