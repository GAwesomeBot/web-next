export default class CenteredWindow {

	public target: string;
	public height: number;
	public width: number;

	private interval: number | null;
	private window: Window | null;
	private callback: Function | null;

	public constructor(target: string, height: number, width: number) {
		this.target = target;
		this.height = height;
		this.width = width;

		this.interval = null;
		this.window = null;
		this.callback = null;
	}

	public open(url: string) {
		const top = (window.screen.height - this.height) / 2;
		const left = (window.screen.width - this.width) / 2;
		this.window = window.open(
			url,
			this.target,
			`height=${this.height},width=${this.width},top=${top},left=${left}`
		);
		this.interval = window.setInterval(this.checkClosed.bind(this), 1000);
	}

	public onClose(callback: Function) {
		this.callback = callback;
	}

	private checkClosed() {
		if (!this.window || !this.window.closed || !this.interval) return;
		window.clearInterval(this.interval);
		if (this.callback) this.callback();
	}

}
