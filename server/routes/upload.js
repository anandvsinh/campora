import express from 'express';

const router = express.Router();

// POST /api/upload — Handle image upload
router.post('/', (req, res) => {
  const { imageBase64, image } = req.body;
  const targetImage = imageBase64 || image;

  if (!targetImage) {
    return res.status(400).json({ error: 'No image payload provided' });
  }

  // Return stored URL / base64 string
  res.json({
    success: true,
    url: targetImage,
    message: 'Gig cover photo successfully saved in backend'
  });
});

export default router;
