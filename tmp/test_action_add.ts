import { addStudent } from '../lib/actions/admin';

async function main() {
    try {
        const res = await addStudent({
            name: "Action Test",
            email: "action-test@example.com",
            course: "英語",
            loginId: "actiontest",
        });
        console.log('Result:', res);
    } catch (error) {
        console.error('Action Error:', error);
    }
}

main();
