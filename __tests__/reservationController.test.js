const { createReservation } = require('../controllers/reservationController');
const { Reservation } = require('../models');

// Mock du module Sequelize pour simuler les appels à la base de données
jest.mock('../models', () => {
    const mockReservation = {
        findOne: jest.fn(),
        create: jest.fn(),
    };

    return {
        Reservation: mockReservation,
    };
});

describe('Tests unitaires pour les fonctions de contrôleur de réservation', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createReservation', () => {
        it('nouvelle réservation', async () => {
            const req = { body: { spotId: 1, date: '2024-03-13', name: 'testRC', note: '', status: 'confirmed', userId: 1, roomId: 1 } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

            Reservation.findOne.mockResolvedValueOnce(null);
            Reservation.create.mockResolvedValueOnce(req.body);

            await createReservation(req, res);

            expect(Reservation.findOne).toHaveBeenCalledWith({ where: { spotId: 1, date: '2024-03-13' } });
            expect(Reservation.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(req.body);
        });
    });
});
