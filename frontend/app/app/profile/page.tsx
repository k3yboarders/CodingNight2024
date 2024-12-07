'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changeEmailSchema, changeNameSchema, changePasswordSchema, changeSleepHoursSchema } from "@/schemas/profile";

const ProfilePage = () => {
    const nameForm = useForm({ resolver: zodResolver(changeNameSchema) });
    const sleepForm = useForm({ resolver: zodResolver(changeSleepHoursSchema) });
    const passwordForm = useForm({ resolver: zodResolver(changePasswordSchema) });
    const emailForm = useForm({ resolver: zodResolver(changeEmailSchema) });

    const handleNameSubmit = (data) => console.log('Zmieniono nazwę użytkownika:', data);
    const handleSleepSubmit = (data) => console.log('Zmieniono liczbę godzin snu:', data);
    const handlePasswordSubmit = (data) => console.log('Zmieniono hasło:', data);
    const handleEmailSubmit = (data) => console.log('Zmieniono email:', data);

    return (
        <div className="w-full space-y-10 mb-24">
            <h1 className="text-center text-3xl">Twój profil</h1>
            <h2 className="text-center">
                <span className="font-semibold">Witaj,</span> username
            </h2>

            <form onSubmit={nameForm.handleSubmit(handleNameSubmit)} className="space-y-4">
                <h2 className="text-center font-semibold">Zmień nazwę użytkownika</h2>
                <input
                    {...nameForm.register('username')}
                    placeholder="Nowa nazwa użytkownika"
                    className="w-full bg-gray-400/5 p-4 rounded-xl focus:ring-2 focus:ring-gradient-1/50 focus:outline-none"
                />
                {nameForm.formState.errors.username?.message && (
                    <p className="text-red-500">{String(nameForm.formState.errors.username.message)}</p>
                )}
                <button type="submit" className="w-full bg-gradient-1/70 text-white py-2 px-4 rounded-xl hover:bg-gradient-1/80 flex items-center justify-center space-x-2">Zmień nazwę</button>
            </form>

            <form onSubmit={sleepForm.handleSubmit(handleSleepSubmit)} className="space-y-4">
                <h2 className="text-center font-semibold">Zmień liczbę godzin snu</h2>
                <input
                    type="number"
                    {...sleepForm.register('sleepHours')}
                    placeholder="Liczba godzin snu"
                    className="w-full bg-gray-400/5 p-4 rounded-xl focus:ring-2 focus:ring-gradient-1/50 focus:outline-none"
                />
                {sleepForm.formState.errors.sleepHours?.message && (
                    <p className="text-red-500">{String(sleepForm.formState.errors.sleepHours.message)}</p>
                )}
                <button type="submit" className="w-full bg-gradient-1/70 text-white py-2 px-4 rounded-xl hover:bg-gradient-1/80 flex items-center justify-center space-x-2">Zmień liczbę godzin snu</button>
            </form>

            <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                <h2 className="text-center font-semibold">Zmień hasło</h2>
                <input
                    type="password"
                    {...passwordForm.register('oldPassword')}
                    placeholder="Stare hasło"
                    className="w-full bg-gray-400/5 p-4 rounded-xl focus:ring-2 focus:ring-gradient-1/50 focus:outline-none"
                />
                <input
                    type="password"
                    {...passwordForm.register('newPassword')}
                    placeholder="Nowe hasło"
                    className="w-full bg-gray-400/5 p-4 rounded-xl focus:ring-2 focus:ring-gradient-1/50 focus:outline-none"
                />
                {passwordForm.formState.errors.oldPassword?.message && (
                    <p className="text-red-500">{String(passwordForm.formState.errors.oldPassword.message)}</p>
                )}
                {passwordForm.formState.errors.newPassword?.message && (
                    <p className="text-red-500">{String(passwordForm.formState.errors.newPassword.message)}</p>
                )}
                <button type="submit" className="w-full bg-gradient-1/70 text-white py-2 px-4 rounded-xl hover:bg-gradient-1/80 flex items-center justify-center space-x-2">Zmień hasło</button>
            </form>

            <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-4">
                <h2 className="text-center font-semibold">Zmień email</h2>
                <input
                    type="email"
                    {...emailForm.register('email')}
                    placeholder="Nowy adres email"
                    className="w-full bg-gray-400/5 p-4 rounded-xl focus:ring-2 focus:ring-gradient-1/50 focus:outline-none"
                />
                {emailForm.formState.errors.email?.message && (
                    <p className="text-red-500">{String(emailForm.formState.errors.email.message)}</p>
                )}
                <button type="submit" className="w-full bg-gradient-1/70 text-white py-2 px-4 rounded-xl hover:bg-gradient-1/80 flex items-center justify-center space-x-2">Zmień email</button>
            </form>
        </div>
    );
};

export default ProfilePage;
