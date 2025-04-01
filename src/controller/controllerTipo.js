import tipoAnimalModel from '../model/tipoAnimal.js'


export const crearTipo = ('/', async (req, res) => {
    try {
        let {tipo} = req.body
        const nuevoTipo = new tipoAnimalModel({
            tipo:tipo,animales:[]
        })
        const tipoGuardado = await nuevoTipo.save()
        res.status(201).json(tipoGuardado)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

export const menuCrearTipo = ('/', async (req, res) => {
    try {
        const {tipo} = req.params
        return res.render('crearTipo',{tipoUsuario:tipo} )
    } catch (error) {
        console.log(error)
    }
})


export const listadoTipos = ('/', async (req, res) => {  
    try {
        const tipos = await tipoAnimalModel.find()
        const {tipo} = req.params
        res.render('listadoTipos', {tiposAnimales: tipos, tipoUsuario: tipo })
    } catch (error) {
        console.log(error)  
        res.status(400).json({ error: error.message })   
    }
    }   
)