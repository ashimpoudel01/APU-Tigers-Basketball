// Test the contact form API endpoint
const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Contact Form',
    message: 'This is a test message to verify the contact form is working.'
};

console.log('Testing contact form endpoint...');
console.log('Sending data:', testData);

fetch('http://localhost:3000/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(testData)
})
.then(response => response.json())
.then(result => {
    console.log('\n✅ Response received:');
    console.log(result);
    if (result.success) {
        console.log('\n🎉 Contact form is working!');
        console.log('Check your email at: poudela2003@gmail.com');
    } else {
        console.log('\n❌ Error:', result.message);
    }
})
.catch(error => {
    console.error('\n❌ Failed to send request:');
    console.error(error.message);
    console.log('\nMake sure the server is running on port 3000');
});
