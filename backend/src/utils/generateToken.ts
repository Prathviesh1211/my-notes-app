import jwt from 'jsonwebtoken';


const generateToken = (id: string): string => {
  const payload = {
    user: {
      id: id,
    },
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

export default generateToken;