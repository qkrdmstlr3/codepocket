export interface CheckType {
  color?: string;
}

const Check: React.FC<CheckType> = ({ color }) => (
  <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.93994 10.9999C2.93994 6.38832 6.67836 2.6499 11.2899 2.6499C12.9359 2.6499 14.4678 3.12513 15.7596 3.94549C16.2258 4.24157 16.8438 4.10365 17.1398 3.63744C17.4359 3.17123 17.298 2.55327 16.8318 2.25718C15.229 1.23928 13.3268 0.649902 11.2899 0.649902C5.57379 0.649902 0.939941 5.28376 0.939941 10.9999C0.939941 16.7161 5.57379 21.3499 11.2899 21.3499C17.0061 21.3499 21.6399 16.7161 21.6399 10.9999C21.6399 10.6477 21.6223 10.2993 21.5878 9.95555C21.5327 9.40602 21.0425 9.00523 20.493 9.06036C19.9435 9.11549 19.5427 9.60566 19.5978 10.1552C19.6257 10.4327 19.6399 10.7145 19.6399 10.9999C19.6399 15.6115 15.9015 19.3499 11.2899 19.3499C6.67836 19.3499 2.93994 15.6115 2.93994 10.9999Z"
      fill={color || '#212124'}
    />
    <path
      d="M22.7806 3.74331C23.1636 3.34542 23.1516 2.71237 22.7537 2.32935C22.3558 1.94634 21.7227 1.95841 21.3397 2.3563L11.7426 12.3263L8.06343 8.68875C7.6707 8.30044 7.03755 8.30404 6.64924 8.69677C6.26094 9.08951 6.26453 9.72266 6.65727 10.111L11.0571 14.4611C11.2473 14.6492 11.505 14.7532 11.7725 14.7499C12.04 14.7466 12.2951 14.6363 12.4806 14.4435L22.7806 3.74331Z"
      fill={color || '#212124'}
    />
  </svg>
);

export default Check;