const express = require('express')
const { getAppointment, getAppointments, getAppointmentsforBarber, createAppointment, updateAppointment, deleteAppointment } = require('../controllers/AppointmentController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getAppointments)
router.get('/:id', getAppointment)
router.get('/barber/:barber', getAppointmentsforBarber)
router.post('/', createAppointment)
router.delete('/:id', deleteAppointment)
router.patch('/:id', updateAppointment)
router.get('/all', getAllAppointments);


module.exports = router
