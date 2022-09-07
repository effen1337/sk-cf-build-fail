import { toast } from '@zerodevx/svelte-toast';

function performSound() {
	var soundButton = document.getElementById('soundBtn');
	soundButton.click();
}
export const announce = {
	success: (m) => {
		toast.push(m, {
			theme: {
				'--toastBackground': 'rgba(59, 172, 57, 0.73)',
				'--toastColor': 'white',
				'--toastBarBackground': 'rgba(255, 255, 255, 0.53)',
				'--toastBoxShadow': 'rgba(90, 194, 88, 0)',
				'--toastBorderRadius': '5px',
				'--toastBarHeight': '2px'
			},
			options: {
				duration: 2000 // duration of progress bar tween to the `next` value
			}
		});
	},
	failure: (m) => {
		performSound();
		toast.push(m, {
			theme: {
				'--toastBackground': 'rgba(226, 13, 13, 0.83)',
				'--toastColor': 'white',
				'--toastBarBackground': 'rgba(255, 255, 255, 0.53)',
				'--toastBoxShadow': 'rgba(90, 194, 88, 0)',
				'--toastBorderRadius': '5px',
				'--toastBarHeight': '2px'
			},
			options: {
				duration: 5000 // duration of progress bar tween to the `next` value
			}
		});
	},
	warning: (m) => {
		performSound();

		toast.push(m, {
			theme: {
				'--toastBackground': 'rgba(226, 162, 13, 0.83)',
				'--toastColor': 'white',
				'--toastBarBackground': 'rgba(255, 255, 255, 0.53)',
				'--toastBoxShadow': 'rgba(90, 194, 88, 0)',
				'--toastBorderRadius': '5px',
				'--toastBarHeight': '2px'
			},
			options: {
				duration: 3000 // duration of progress bar tween to the `next` value
			}
		});
	}
};