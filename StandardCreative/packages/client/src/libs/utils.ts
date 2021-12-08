import { ethers } from 'ethers'

export function parseUnits(number, units) {
  if (typeof number == 'number') {
	  number = number.toFixed(units || 16);
  }
  return ethers.utils.parseUnits(number, units || 8)
}
