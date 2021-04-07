import {
    RecoilState,
    useRecoilCallback
} from 'recoil';
import { Subject } from 'rxjs';

type RecoilInjection<T> = {
    atom: RecoilState<T>,
    value: T
}

type RecoilRetrieval<T> = {
    atom: RecoilState<T>,
    subject: Subject<T>
}

const nexus = {
    get: new Subject<RecoilRetrieval<any>>(),
    set: new Subject<RecoilInjection<any>>()
}

export default function RecoilNexus() {

    const getAtom = useRecoilCallback(({ snapshot }) =>
        async function <T>(atom: RecoilState<T>, subject: Subject<T>) {
            const value = await snapshot.getPromise(atom);
            subject.next(value)
        }, [])

    nexus.get.subscribe({ next: ({ atom, subject }) => getAtom(atom, subject) })

    const setAtom = useRecoilCallback(({ set }) =>
        function <T>(atom: RecoilState<T>, value: T) {
            set(atom, value)
        }, [])

    nexus.set.subscribe({ next: ({ atom, value }) => setAtom(atom, value) });

    return null
}


export function getRecoil<T>(atom: RecoilState<T>): Promise<T> {

    return new Promise<T>(
        async function (resolve) {
            const temporary = new Subject<T>()
            temporary.subscribe({
                next: (value) => resolve(value)
            });
            nexus.get.next({ atom, subject: temporary });
        }
    )
}

export function setRecoil<T>(atom: RecoilState<T>, value: T) {

    nexus.set.next(
        { atom, value } as RecoilInjection<T>
    )

}

