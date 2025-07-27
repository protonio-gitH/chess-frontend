export type ModalType = 'login' | 'register';

export interface ModalOptions {
	modalType: ModalType;
	open: boolean;
}

export interface ModalContextType {
	modalOptions: ModalOptions;
	setModalOptions: React.Dispatch<React.SetStateAction<ModalOptions>>;
}
