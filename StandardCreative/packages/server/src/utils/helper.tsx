export function isDesktop() {
	return window.innerWidth >= 992
}

export function isMobile() {
	return window.innerWidth < 992
}

export function isSmallMobile() {
	return window.innerWidth < 576
}

export function isNumber(variable) {
	return Number.isFinite(variable)
}

export function isValidText(text, requiredTrim = false) {
	return (text && (requiredTrim ? (text.trim() !== "") : (text !== "")))
}

export const currentDateTime = () => {
   let dateTime = require('node-datetime');
   let dt = dateTime.create();
   return dt.format('Y-m-d H:M:S');
}

export function firstLetter(text) {
	if (!isValidText(text)) { return "" }
	return text.substr(0, 1).toUpperCase()
}

export function isValidEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

export function isValidPassword(password) {
	const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\-/@#$%{}^&_+=()!,<>?:;*]).{6,}$/
	//	const regExp = /^(?=.*[\\d])(?=.*[A-Z])[\\w!@#$%^&*-:;<>.,]{8,}$/
	return regExp.test(password)
}

export function checkPasswordValidation(password1, password2) {
	let results = []
	if (!password1 || password1 === "" || !password2 || password2 === "") {
		results.push("Please fill passwords.")
	}

	if (!isValidPassword(password1)) {
		results.push("Password doesn't meet requirements.")
	}

	if (password1 !== password2) {
		results.push("Passwords do not match.")
	}

	return results
}

export function isValidPhoneNumber(phoneNumber) {
	if (!isValidText(phoneNumber, true)) { return false }
	const filteredPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
	return filteredPhoneNumber.length >= 10
}

export function randomUUID() {
	let u = Date.now().toString(16) + Math.random().toString(16) + '0'.repeat(16)
	let result = [u.substr(0, 8), u.substr(8, 4), '4000-8' + u.substr(13, 3), u.substr(16, 12)].join('-')
	return result
}

export function zeroPad(number, base) {
	var len = (String(base).length - String(number).length) + 1
	return len > 0 ? new Array(len).join('0') + number : number
}

export function colorFromText(text, invert = false) {
	function hashCode(text) {
		let hash = 0
		for (let i = 0; i < text.length; i++) {
			hash = text.charCodeAt(i) + ((hash << 5) - hash)
		}
		return hash;
	}

	const i = hashCode(text)
	let hex = i & 0x00FFFFFF
	if (invert) { hex = 0x00FFFFFF - hex }
	let c = (hex).toString(16).toUpperCase()

	const result = "00000".substring(0, 6 - c.length) + c
	return '#' + result
}

export function generateCode(length) {
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var result = ""
	for (var i = 0; i < length; i++) {
		result += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return result
}