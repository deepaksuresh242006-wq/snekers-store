
import { initializeApp } from 'firebase/app';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '../../');

console.log('🧪 Starting Authentication Tests...\n');

const tests = {
    passed: 0,
    failed: 0,
    results: []
};

function test(name, condition) {
    if (condition) {
        tests.passed++;
        tests.results.push(`✅ ${name}`);
    } else {
        tests.failed++;
        tests.results.push(`❌ ${name}`);
    }
}

async function runTests() {
    // Test 1: Check Firebase config exists
    try {
        const configPath = path.join(projectRoot, 'lib/firebase.ts');
        const configExists = fs.existsSync(configPath);
        test('Firebase config file exists', configExists);
    } catch (e) {
        test('Firebase config file exists', false);
    }

    // Test 2: Check AuthContext exists
    try {
        const authContextPath = path.join(projectRoot, 'context/AuthContext.tsx');
        const authContextExists = fs.existsSync(authContextPath);
        test('AuthContext file exists', authContextExists);
    } catch (e) {
        test('AuthContext file exists', false);
    }

    // Test 3: Check SignIn page exists
    try {
        const signInPath = path.join(projectRoot, 'pages/SignIn.tsx');
        const signInExists = fs.existsSync(signInPath);
        test('SignIn page exists', signInExists);
    } catch (e) {
        test('SignIn page exists', false);
    }

    // Test 4: Check SignUp page exists
    try {
        const signUpPath = path.join(projectRoot, 'pages/SignUp.tsx');
        const signUpExists = fs.existsSync(signUpPath);
        test('SignUp page exists', signUpExists);
    } catch (e) {
        test('SignUp page exists', false);
    }

    // Test 5: Check ProtectedRoute exists
    try {
        const protectedRoutePath = path.join(projectRoot, 'components/ProtectedRoute.tsx');
        const protectedRouteExists = fs.existsSync(protectedRoutePath);
        test('ProtectedRoute component exists', protectedRouteExists);
    } catch (e) {
        test('ProtectedRoute component exists', false);
    }

    // Test 6: Check environment variables
    try {
        const envPath = path.join(projectRoot, '.env.local');
        const envExists = fs.existsSync(envPath);
        test('Environment file exists', envExists);

        if (envExists) {
            const envContent = fs.readFileSync(envPath, 'utf8');
            test('API Key configured', envContent.includes('VITE_FIREBASE_API_KEY'));
        }
    } catch (e) {
        test('Environment file exists', false);
    }

    // Print results
    console.log('\n📊 TEST RESULTS:');
    console.log('================');
    tests.results.forEach(r => console.log(r));
    console.log('================');
    console.log(`Total: ${tests.passed + tests.failed} | Passed: ${tests.passed} | Failed: ${tests.failed}`);

    if (tests.failed > 0) {
        console.log('\n⚠️  Some tests failed. Please fix issues before proceeding.');
        process.exit(1);
    } else {
        console.log('\n🎉 All tests passed! Authentication setup is complete.');
    }
}

runTests().catch(console.error);
