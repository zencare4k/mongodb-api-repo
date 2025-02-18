const Tarea = require('../models/tarea');

class TareasController {
    async obtenerTareas(req, res) {
        try {
            const tareas = await Tarea.find();
            res.json(tareas);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al obtener las tareas' });
        }
    }

    async crearTarea(req, res) {
        const { titulo, descripcion } = req.body;
        if (!titulo || !descripcion) {
            return res.status(400).json({ mensaje: 'Título y descripción son requeridos' });
        }

        const nuevaTarea = new Tarea({ titulo, descripcion });
        try {
            await nuevaTarea.save();
            res.status(201).json(nuevaTarea);
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al crear la tarea' });
        }
    }

    async eliminarTarea(req, res) {
        const { id } = req.params;
        try {
            const tarea = await Tarea.findByIdAndDelete(id);
            if (!tarea) {
                return res.status(404).json({ mensaje: 'Tarea no encontrada' });
            }
            res.status(200).json({ mensaje: 'Tarea eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ mensaje: 'Error al eliminar la tarea' });
        }
    }
}

module.exports = new TareasController();