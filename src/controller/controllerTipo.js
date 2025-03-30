import tipoAnimalModel from '../model/tipoAnimal.js'


export const crearTipo = ('/', async (req, res) => {
    try {
        let {tipo,animales} = req.body
        const nuevoTipo = new tipoAnimalModel({
            tipo:tipo,animales:animales||[]
        })
        const tipoGuardado = await nuevoTipo.save()
        res.status(201).json(tipoGuardado)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})