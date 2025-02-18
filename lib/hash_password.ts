import { createHash } from 'crypto';

export const hashPassword = (password: string) => {
    
  const hash = createHash('sha256');
  hash.update(password);
  const hashedPassword = hash.digest('hex');
  
  return hashedPassword;
};
