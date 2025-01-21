Labos sadrzi minimalne promjene nad mojim petim labosom jer sam već napravio backend u expressu i firestoreu. Samo sam promjenio modele da koriste metode za mysql bazu umjesto za firestore.

.env file očeuje slijedeće varijable

```
SECRET=
DATABASE_URL=localhost
DATABASE_PORT=3306
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_DB=
```

Primjer .env file je uključen u arhivu projekta.



Prije pokretanja, projekt očekuje da postoji baza pod imenom DATABASE_DB na mysql serveru. Da projekt stvori potrebne tablice u bazi, treba izvršiti u glavnoj mapi:

```
npm i
npx drizzle-kit push
```

Za pokretanje dev servera:

- Unutar frontend mape:`npm i` zatim `npm run watch`
- Unutar glavne mape: `npm i` zatim `npm run dev`