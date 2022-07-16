import { store } from './src/app/setup/store'

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

export interface Comment {
	id: string
	userId: string
	comment: string
	date: string
}
export interface Post {
	id: string
	userId: string
	image: string
	image_name: string
	desc: string
	date: string
	liked_by: string[]
	comments: Comment[]
}

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type Selector<S> = (state: RootState) => S
