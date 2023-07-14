import 'dotenv/config';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config } from 'dotenv';
import process from 'process';

config({ path: '../../.env' });

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],

	server: {
		port: process.env.CLIENT_PORT ? Number(process.env.CLIENT_PORT) : 3000,
		proxy: {
			'/api': {
				target: `http://localhost:${process.env.API_PORT || 4000}`,
				changeOrigin: true,
				secure: false,
			},
		},
	},
	build: {
		outDir: '../../build/client',
		emptyOutDir: true,
	},
});
