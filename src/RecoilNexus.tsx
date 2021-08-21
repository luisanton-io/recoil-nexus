import { RecoilState, useRecoilCallback } from 'recoil';

interface Nexus {
    get?: <T>(atom: RecoilState<T>) => T
    getPromise?: <T>(atom: RecoilState<T>) => Promise<T>
    set?: <T>(recoilVal: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) => void
}

const nexus: Nexus = {}

export default function RecoilNexus() {

    nexus.get = useRecoilCallback<[atom: RecoilState<any>], any>(({ snapshot }) =>
        function <T>(atom: RecoilState<T>) {
            return snapshot.getLoadable(atom).contents
        }, [])

    nexus.getPromise = useRecoilCallback<[atom: RecoilState<any>], Promise<any>>(({ snapshot }) =>
        function <T>(atom: RecoilState<T>) {
            return snapshot.getPromise(atom)
        }, [])

    nexus.set = useRecoilCallback(({ set }) => set, [])

    return null
}

export function getRecoil<T>(atom: RecoilState<T>): T {
    return nexus.get!(atom)
}

export function getRecoilPromise<T>(atom: RecoilState<T>): Promise<T> {
    return nexus.getPromise!(atom)
}

export function setRecoil<T>(atom: RecoilState<T>, value: T) {
    nexus.set!(atom, value)
}