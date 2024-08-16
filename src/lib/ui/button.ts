import { cva } from 'class-variance-authority';
export const varButton = cva('base', {
	variants: {
		variant: {
			default: 'default',
			primary: 'primary'
		},
		loading: { true: '' }
	},
	defaultVariants: {
		variant: 'default'
	}
});
