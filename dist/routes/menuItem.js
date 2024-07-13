"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = __importDefault(require("../prisma/client"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Get all menu items
router.get('/', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const menuItems = yield client_1.default.menuItem.findMany();
        res.json(menuItems);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Create a new menu item
router.post('/', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price } = req.body;
    const userId = req.user.userId;
    try {
        const newMenuItem = yield client_1.default.menuItem.create({
            data: {
                name,
                description,
                price,
                userId,
            },
        });
        res.json(newMenuItem);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Get a single menu item by ID
router.get('/:id', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const menuItem = yield client_1.default.menuItem.findUnique({ where: { id: Number(id) } });
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }
        res.json(menuItem);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Update a menu item by ID
router.put('/:id', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        const updatedMenuItem = yield client_1.default.menuItem.update({
            where: { id: Number(id) },
            data: {
                name,
                description,
                price,
            },
        });
        res.json(updatedMenuItem);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Delete a menu item by ID
router.delete('/:id', auth_1.authenticateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield client_1.default.menuItem.delete({ where: { id: Number(id) } });
        res.json({ message: 'Menu item deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
