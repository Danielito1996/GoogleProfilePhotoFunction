import func from '../src/index.js';

const fakeReq = {
    headers: {
        // Reemplaza 'TU_TOKEN_DE_GOOGLE' por un token válido
        authorization: 'Bearer ya29.A0AS3H6NxhxploMK9D1Kwt-_xnLdOVYXyTsqyhkaX0SyWvsgAzlymSs7TZppQMVijLI33JN6IF_t_PKAKn92bPuOHx21JNAZkfwGgpsv9Gnut1Reld3CcqRS-eJUauQ7z6RsY-jQK1iDQCDob6iElfmvjaVKV84ij7MQGW-fypPvL-RgVGZmXqWHXjnsSEgdr8YhV7SZF4aCgYKAZkSAQ8SFQHGX2MivbxGEejr57IJ2ltsfL1aDQ0207'
    }
};

const fakeRes = {
    json: (data, status = 200) => {
        console.log('Status:', status);
        console.log('Response:', data);
        return data;
    }
};

const log = console.log;
const error = console.error;

func({ req: fakeReq, res: fakeRes, log, error });