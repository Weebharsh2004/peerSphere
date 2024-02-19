const { z } = require('zod');

const registerSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email().refine(value => value.endsWith('@nitj.ac.in'), {
        message: 'Email must be from @nitj.ac.in domain',
    }),
    password: z.string().min(6),
    profileImage: z.string().optional(),
});

const validateRegistration = (req, res, next) => {
    try {
        const { username, email, password, profileImage } = req.body;

        const parsedData = registerSchema.safeParse({
            username,
            email,
            password,
            profileImage,
        });

        if (!parsedData.success) {
            return res.status(400).json({
                err: 'Invalid input data',
            });
        }

        req.validatedData = parsedData.data;
        next();
    } catch (err) {
        console.error('Error during validation:', err.message);
        res.status(500).json({
            err: 'Internal server error during validation',
        });
    }
};

module.exports = validateRegistration;
