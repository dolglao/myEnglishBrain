import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://root:root@cluster0.ct8tftd.mongodb.net/myEnglishBrain?retryWrites=true&w=majority';
const client = new MongoClient(uri);

async function removeDuplicates() {
    try {
        await client.connect();
        const db = client.db('myEnglishBrain');
        const collection = db.collection('sentences');

        // Passo 1: Consultar documentos duplicados
        const duplicateDocs = await collection.aggregate([
            { $group: { _id: { field1: '$field1', field2: '$field2' }, count: { $sum: 1 }, ids: { $push: '$_id' } } },
            { $match: { count: { $gt: 1 } } },
            { $project: { _id: 0, ids: 1 } },
        ]).toArray();

        // Passo 2: Armazenar ids em uma lista
        const idsToRemove = duplicateDocs.flatMap(doc => doc.ids.slice(1));

        // Passo 3: Remover documentos
        const result = await collection.deleteMany({ _id: { $in: idsToRemove } });
        console.log(`${result.deletedCount} documents removed.`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

removeDuplicates();
