import SQLite from 'react-native-sqlite-2';

const dbName = 'starwars.db';
const dbVersion = '2.0';
const dbDisplayname = 'SQLite Favorites Database';
const dbSize = 200000;

const getAllFavorites = () => {
    const db = SQLite.openDatabase(dbName, dbVersion,
        dbDisplayname, dbSize);

    return new Promise((resolve, reject) => {
        const array = [];
        db.transaction((txn) => {
            txn.executeSql('CREATE TABLE IF NOT EXISTS favorites(id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30), url VARCHAR(30))', []);
            txn.executeSql('SELECT * FROM `favorites`', [], (tx, res) => {
                for (let i = 0; i < res.rows.length; ++i) {
                    array.push(res.rows.item(i));
                }
                resolve(array);
            });
        });
    });
}


const deleteFavorites = (url) => {
    const db = SQLite.openDatabase(dbName, dbVersion,
        dbDisplayname, dbSize);

    db.transaction((txn) => {
        txn.executeSql('DELETE FROM `favorites` WHERE url = :url', [url],
            (tx, res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            });
    });
};

const insertFavorites = (name, url) => {
    const db = SQLite.openDatabase(dbName, dbVersion,
        dbDisplayname, dbSize);
    db.transaction((txn) => {
        txn.executeSql('INSERT INTO `favorites` (name,url) VALUES (:name,:url)', [name, url],
            (tx, res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            });
    });
}

const SqlHelper = {
    getAllFavorites,
    deleteFavorites,
    insertFavorites
}

export default SqlHelper;
