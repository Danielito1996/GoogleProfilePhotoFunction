import { Client } from 'node-appwrite';
import fetch from 'node-fetch'; // Usando node-fetch@3

export default async ({ req, res, log, error }) => {
    try {
        // 1. Extraer el token de Google del header
        const authHeader = req.headers['authorization'] || '';
        const googleToken = authHeader.split(' ')[1];
        
        console.log("\nToken recibido:", googleToken); // Debug seguro

        if (!googleToken) {
            throw new Error("Token de Google no proporcionado en el header 'Authorization'");
        }

        log(`Token recibido (${googleToken.length} caracteres)`); // Debug seguro

        // 2. Llamar a Google People API
        const response = await fetch('https://people.googleapis.com/v1/people/me?personFields=photos', {
            headers: { 
                'Authorization': `Bearer ${googleToken}`,
                'Accept': 'application/json'
            }
        });

        // 3. Manejar errores de la API
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`Google API respondió con ${response.status}: ${errorData}`);
        }

        // 4. Procesar respuesta exitosa
        const data = await response.json();
        const photoUrl = data.photos?.[0]?.url;

        if (!photoUrl) {
            throw new Error("No se encontró URL de foto en la respuesta de Google");
        }

        // 5. Devolver resultado
        return res.json({ 
            success: true,
            photoUrl: photoUrl 
        });

    } catch (err) {
        error(err.message); // Log en dashboard de AppWrite
        return res.json({ 
            success: false,
            error: err.message 
        }, 500);
    }
};