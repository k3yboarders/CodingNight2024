import { Role } from "@prisma/client";

export const users = [
    {
        id: '11a3da03-5b3a-452e-a157-515f68098e59',
        username: 'test',
        email: 'test@test.com',
        role: Role.CHILD,
        // asdasd
        password: 'e54ee7e285fbb0275279143abc4c554e5314e7b417ecac83a5984a964facbaad68866a2841c3e83ddf125a2985566261c4014f9f960ec60253aebcda9513a9b4',
    },
    {
        id: '9917b0de-74a5-4daf-a9b0-a2192e158ea3',
        username: 'psychologist',
        email: 'psycho@test.com',
        role: Role.PSYCHOLOGIST,
        // asdasd
        password: 'e54ee7e285fbb0275279143abc4c554e5314e7b417ecac83a5984a964facbaad68866a2841c3e83ddf125a2985566261c4014f9f960ec60253aebcda9513a9b4',
    }
]