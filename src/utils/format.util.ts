export function formatDate(dateString: string, locale: string = 'ko-KR', options: Intl.DateTimeFormatOptions = {}): string {
	const date = new Date(dateString);
	
	const defaultOptions: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long',
		...options,
	};

	const formatter = new Intl.DateTimeFormat(locale, defaultOptions);
	return formatter.format(date);
}
