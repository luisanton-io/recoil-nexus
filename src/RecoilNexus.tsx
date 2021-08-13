import React from 'react'
import { RecoilState, useRecoilCallback } from 'recoil';

type RecoilInjection<T> = {
    atom: RecoilState<T>,
    value: T
}

type RecoilRetrieval<T> = {
    atom: RecoilState<T>,
    resolve: (value: T | PromiseLike<T>) => void
}

interface Nexus {
    get?: <T>(args: RecoilRetrieval<T>) => void
    set?: <T>(args: RecoilInjection<T>) => void
}

const nexus: Nexus = {}

export default function RecoilNexus() {

    nexus.get = useRecoilCallback<[RecoilRetrieval<any>], void>(({ snapshot }) =>
        function <T>({ atom, resolve }: RecoilRetrieval<T>) {
            resolve(snapshot.getPromise(atom))
        }, [])

    nexus.set = useRecoilCallback<[RecoilInjection<any>], void>(({ set }) =>
        function <T>({ atom, value }: RecoilInjection<T>) {
            set(atom, value)
        }, [])

    return null
}

export function getRecoil<T>(atom: RecoilState<T>): Promise<T> {
    return new Promise<T>((resolve) => {
        nexus.get!({ atom, resolve })
    })
}

export function setRecoil<T>(atom: RecoilState<T>, value: T) {
    nexus.set!(
        { atom, value } as RecoilInjection<T>
    )
}