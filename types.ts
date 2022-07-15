import { store } from "./src/app/setup/store"

export interface User {
	id: string
	username: string
}

export interface Message {
	id: string
	sender_id: string
	receiver_id: string
	message: string
	date: string
	seen_status: boolean
}

export type RootState = ReturnType<typeof store.getState>

export type Selector<S> = (state: RootState) => S;
