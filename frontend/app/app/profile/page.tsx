'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changeEmailSchema, changeNameSchema, changePasswordSchema, changeSleepHoursSchema } from "@/schemas/profile";
import { changePassword, getUserInfo, logout } from "@/actions/auth";
import { updateSettings } from "@/actions/settings";
import { redirect } from "next/navigation";

import type { z } from "zod";

type ChangeNameFormData = z.infer<typeof changeNameSchema>;
type ChangeSleepHoursFormData = z.infer<typeof changeSleepHoursSchema>;
type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
type ChangeEmailFormData = z.infer<typeof changeEmailSchema>;

const ProfilePage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [sleepHours, setSleepHours] = useState(0);

    useEffect(() => {
        getUserInfo().then((data) => {
            setUsername(data.username);
            setEmail(data.email);
            setSleepHours(+data.sleepHours);
        });
    }, []);

    useEffect(() => {
        updateSettings({ username, email, expectedSleepTime: sleepHours });
    }, [username, email, sleepHours]);

    const nameForm = useForm<ChangeNameFormData>({ resolver: zodResolver(changeNameSchema) });
    const sleepForm = useForm<ChangeSleepHoursFormData>({ resolver: zodResolver(changeSleepHoursSchema) });
    const passwordForm = useForm<ChangePasswordFormData>({ resolver: zodResolver(changePasswordSchema) });
    const emailForm = useForm<ChangeEmailFormData>({ resolver: zodResolver(changeEmailSchema) });

    const handleNameSubmit = (data: ChangeNameFormData) => setUsername(data.username);
    const handleSleepSubmit = (data: ChangeSleepHoursFormData) => setSleepHours(+data.sleepHours);
    const handlePasswordSubmit = (data: ChangePasswordFormData) => changePassword(data.oldPassword, data.newPassword);
    const handleEmailSubmit = (data: ChangeEmailFormData) => console.log('Zmieniono email:', data);

    return (
        <div className="w-full space-y-10 mb-24">
            <h1 className="text-center text-3xl">Twój profil</h1>
            <h2 className="text-center text-2xl">
                <span className="font-semibold">Witaj,</span> {username}
            </h2>

            <form onSubmit={nameForm.handleSubmit(handleNameSubmit)} className="space-y-4">
                <h2 className="text-center font-semibold">Zmień nazwę użytkownika</h2>
                <input
                    {...nameForm.register('username')}
                    placeholder="Nowa nazwa użytkownika"
                    className="w-full bg-gray-400/5 p-4 rounded-xl focus:ring-2 focus:ring-gradient-1/50 focus:outline-none"
                />
                {nameForm.formState.errors.username?.message && (
                    <p className="text-red-500">{nameForm.formState.errors.username.message}</p>
                )}
                <button type="submit" className="w-full bg-gradient-1/70 text-white py-2 px-4 rounded-xl hover:bg-gradient-1/80 flex items-center justify-center space-x-2">Zmień nazwę</button>
            </form>

            <form onSubmit={sleepForm.handleSubmit(handleSleepSubmit)} className="space-y-4">
                <h2 className="text-center font-semibold">Zmień preferowaną liczbę godzin snu</h2>
                <input
                    type="number"
                    {...sleepForm.register('sleepHours')}
                    placeholder="Liczba godzin snu"
                    className="w-full bg-gray-400/5 p-4 rounded-xl focus:ring-2 focus:ring-gradient-1/50 focus:outline-none"
                />
                {sleepForm.formState.errors.sleepHours?.message && (
                    <p className="text-red-500">{sleepForm.formState.errors.sleepHours.message}</p>
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
                    <p className="text-red-500">{passwordForm.formState.errors.oldPassword.message}</p>
                )}
                {passwordForm.formState.errors.newPassword?.message && (
                    <p className="text-red-500">{passwordForm.formState.errors.newPassword.message}</p>
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
                    <p className="text-red-500">{emailForm.formState.errors.email.message}</p>
                )}
                <button type="submit" className="w-full bg-gradient-1/70 text-white py-2 px-4 rounded-xl hover:bg-gradient-1/80 flex items-center justify-center space-x-2">Zmień email</button>
            </form>

            <button className="w-full bg-red-700 text-white py-2 px-4 rounded-xl hover:bg-red-600 flex items-center justify-center space-x-2" onClick={() => {
                logout();
                redirect('/')
            }}>Wyloguj się</button>
        </div>
    );
};

export default ProfilePage;
