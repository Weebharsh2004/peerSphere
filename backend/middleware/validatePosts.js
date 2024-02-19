const { z } = require('zod');

const validTopics = ['academics', 'technology', 'placements', 'extra_curricular', 'personal_life', 'others'];

const postData = z.object({
    content: z.string().min(1).max(500).refine(value => value.trim() !== '', { message: 'Content cannot be empty' }),
    image: z.string().optional(),
    topic: z.string().refine(topic => validTopics.includes(topic), { message: 'Invalid topic' }),
});

const validatePost = (req, res, next) => {
    try {
        req.validatedData = postData.parse(req.body);
        next();
    } catch (error) {
        console.error('Error during post validation:', error.errors);
        res.status(400).json({
            err: 'Invalid input data',
            details: error.errors,
        });
    }
};

module.exports = validatePost;
