import { RecoilValue, RecoilState, useRecoilCallback } from 'recoil';

interface Nexus {
    get?: <T>(atom: RecoilValue<T>) => T
    getPromise?: <T>(atom: RecoilValue<T>) => Promise<T>
    set?: <T>(atom: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) => void
    reset?: (atom: RecoilState<any>) => void
}

const nexus: Nexus = {}

export default function RecoilNexus() {

    nexus.get = useRecoilCallback<[atom: RecoilValue<any>], any>(({ snapshot }) =>
        function <T>(atom: RecoilValue<T>) {
            return snapshot.getLoadable(atom).contents
        }, [])

    nexus.getPromise = useRecoilCallback<[atom: RecoilValue<any>], Promise<any>>(({ snapshot }) =>
        function <T>(atom: RecoilValue<T>) {
            return snapshot.getPromise(atom)
        }, [])

    nexus.set = useRecoilCallback(({ snapshot, gotoSnapshot }) => {
        return function <T>(atom: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) {
            const newSnapshot = snapshot.map(mutable => {
                mutable.set(atom, valOrUpdater)
            })
    
            gotoSnapshot(newSnapshot)
        }
    }, [])

    nexus.reset = useRecoilCallback(({ reset }) => reset, [])

    return null
}

export function getRecoil<T>(atom: RecoilValue<T>): T {
    return nexus.get!(atom)
}

export function getRecoilPromise<T>(atom: RecoilValue<T>): Promise<T> {
    return nexus.getPromise!(atom)
}

export function setRecoil<T>(atom: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) {
    nexus.set!(atom, valOrUpdater)
}

export function resetRecoil(atom: RecoilState<any>) {
    nexus.reset!(atom)
}
