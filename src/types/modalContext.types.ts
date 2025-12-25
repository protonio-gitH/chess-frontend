export type ModalType = 'login' | 'register' | 'createGame';

export interface ModalOptions {
	modalType: ModalType;
	open: boolean;
}

export interface ModalContextType {
	modalOptions: ModalOptions;
	setModalOptions: React.Dispatch<React.SetStateAction<ModalOptions>>;
}
