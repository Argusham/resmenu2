import { Router, Request, Response } from 'express';
import prisma from '../prisma/client';
import { authenticateJWT } from '../middleware/auth';

interface AuthRequest extends Request {
  user?: any;
}

const router = Router();

// Get all menu items
router.get('/', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const menuItems = await prisma.menuItem.findMany();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
});

// Create a new menu item
router.post('/', authenticateJWT, async (req: AuthRequest, res: Response) => {
  const { name, description, price } = req.body;
  const userId = req.user.userId;
  try {
    const newMenuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        userId,
      },
    });
    res.json(newMenuItem);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
});

// Get a single menu item by ID
router.get('/:id', authenticateJWT, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const menuItem = await prisma.menuItem.findUnique({ where: { id: Number(id) } });
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
});

// Update a menu item by ID
router.put('/:id', authenticateJWT, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const updatedMenuItem = await prisma.menuItem.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price,
      },
    });
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
});

// Delete a menu item by ID
router.delete('/:id', authenticateJWT, async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.menuItem.delete({ where: { id: Number(id) } });
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
});

export default router;
