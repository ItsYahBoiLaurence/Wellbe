import { rem } from '@mantine/core';

interface DashboardIconProps extends React.ComponentPropsWithoutRef<'svg'> {
  size?: number | string;
}

export function SettingsIcon({ size, style, ...props }: DashboardIconProps) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: rem(size), height: rem(size), ...style }}
      {...props}
    >
      <path
        d="M17.6667 29.6667H12.3334C11.9798 29.6667 11.6406 29.5262 11.3906 29.2761C11.1405 29.0261 11.0001 28.687 11.0001 28.3333V26.3067C9.61456 25.8158 8.33104 25.0746 7.21339 24.12L5.45339 25.1333C5.30121 25.2215 5.13309 25.2787 4.95872 25.3016C4.78435 25.3245 4.60717 25.3127 4.43738 25.2668C4.2676 25.221 4.10856 25.142 3.96943 25.0344C3.8303 24.9268 3.71383 24.7928 3.62672 24.64L0.960055 20.0267C0.789496 19.7178 0.741875 19.3558 0.826722 19.0133C0.872241 18.8431 0.951062 18.6835 1.05863 18.5439C1.16619 18.4043 1.30036 18.2874 1.45339 18.2L3.21339 17.1867C2.92877 15.7428 2.92877 14.2572 3.21339 12.8133L1.45339 11.8C1.14708 11.6265 0.921813 11.3389 0.826722 11C0.741875 10.6575 0.789496 10.2956 0.960055 9.98667L3.62672 5.37334C3.71271 5.21944 3.82836 5.08412 3.96698 4.9752C4.10561 4.86629 4.26445 4.78595 4.43433 4.73883C4.60421 4.69172 4.78174 4.67875 4.95666 4.70069C5.13158 4.72264 5.30041 4.77905 5.45339 4.86667L7.21339 5.88C8.33104 4.92535 9.61456 4.18416 11.0001 3.69334V1.66667C11.0001 1.31305 11.1405 0.973908 11.3906 0.72386C11.6406 0.473812 11.9798 0.333336 12.3334 0.333336H17.6667C18.0203 0.333336 18.3595 0.473812 18.6095 0.72386C18.8596 0.973908 19.0001 1.31305 19.0001 1.66667V3.69334C20.3855 4.18416 21.6691 4.92535 22.7867 5.88L24.5467 4.86667C24.6989 4.77851 24.867 4.72133 25.0414 4.69842C25.2158 4.67551 25.3929 4.68732 25.5627 4.73317C25.7325 4.77903 25.8916 4.85802 26.0307 4.9656C26.1698 5.07318 26.2863 5.20722 26.3734 5.36L29.0401 9.97333C29.2106 10.2822 29.2582 10.6442 29.1734 10.9867C29.1279 11.1569 29.049 11.3165 28.9415 11.4561C28.8339 11.5957 28.6997 11.7126 28.5467 11.8L26.7867 12.8133C27.0713 14.2572 27.0713 15.7428 26.7867 17.1867L28.5467 18.2C28.6997 18.2874 28.8339 18.4043 28.9415 18.5439C29.049 18.6835 29.1279 18.8431 29.1734 19.0133C29.2582 19.3558 29.2106 19.7178 29.0401 20.0267L26.3734 24.64C26.2863 24.7928 26.1698 24.9268 26.0307 25.0344C25.8916 25.142 25.7325 25.221 25.5627 25.2668C25.3929 25.3127 25.2158 25.3245 25.0414 25.3016C24.867 25.2787 24.6989 25.2215 24.5467 25.1333L22.7867 24.12C21.6691 25.0746 20.3855 25.8158 19.0001 26.3067V28.3333C19.0001 28.687 18.8596 29.0261 18.6095 29.2761C18.3595 29.5262 18.0203 29.6667 17.6667 29.6667ZM13.6667 27H16.3334V25.32C16.3238 25.0172 16.4176 24.7202 16.5994 24.4778C16.7812 24.2355 17.04 24.0622 17.3334 23.9867C18.9751 23.5809 20.474 22.7323 21.6667 21.5333C21.8753 21.3215 22.1486 21.1855 22.4434 21.1469C22.7381 21.1082 23.0373 21.1692 23.2934 21.32L24.7334 22.16L26.0667 19.84L24.6001 19C24.3459 18.8517 24.1479 18.6236 24.037 18.351C23.9261 18.0785 23.9084 17.777 23.9867 17.4933C24.4493 15.8633 24.4493 14.1367 23.9867 12.5067C23.9084 12.2231 23.9261 11.9215 24.037 11.649C24.1479 11.3764 24.3459 11.1483 24.6001 11L26.0534 10.16L24.7201 7.84L23.2801 8.68C23.0253 8.82753 22.7289 8.88661 22.4371 8.84802C22.1452 8.80943 21.8744 8.67534 21.6667 8.46667C20.4825 7.25526 18.9881 6.39272 17.3467 5.97334C17.0534 5.89775 16.7945 5.72452 16.6127 5.48217C16.431 5.23982 16.3371 4.94279 16.3467 4.64V3H13.6667V4.68C13.6763 4.98279 13.5825 5.27982 13.4007 5.52217C13.219 5.76452 12.9601 5.93775 12.6667 6.01334C11.025 6.41915 9.5261 7.26775 8.33339 8.46667C8.12482 8.67846 7.85147 8.81448 7.55675 8.85314C7.26203 8.89179 6.96284 8.83085 6.70672 8.68L5.28006 7.84L3.94672 10.16L5.40006 11C5.65421 11.1483 5.85217 11.3764 5.96311 11.649C6.07405 11.9215 6.09173 12.2231 6.01339 12.5067C5.55083 14.1367 5.55083 15.8633 6.01339 17.4933C6.09173 17.777 6.07405 18.0785 5.96311 18.351C5.85217 18.6236 5.65421 18.8517 5.40006 19L3.94672 19.84L5.28006 22.16L6.72006 21.32C6.9748 21.1725 7.2712 21.1134 7.56304 21.152C7.85488 21.1906 8.12574 21.3247 8.33339 21.5333C9.5176 22.7447 11.012 23.6073 12.6534 24.0267C12.9467 24.1022 13.2056 24.2755 13.3874 24.5178C13.5692 24.7602 13.663 25.0572 13.6534 25.36L13.6667 27ZM15.0001 21.6667C13.6815 21.6667 12.3926 21.2757 11.2963 20.5431C10.1999 19.8106 9.34544 18.7694 8.84086 17.5512C8.33627 16.333 8.20425 14.9926 8.46149 13.6994C8.71872 12.4062 9.35366 11.2183 10.286 10.286C11.2184 9.35361 12.4062 8.71867 13.6995 8.46143C14.9927 8.2042 16.3331 8.33622 17.5513 8.8408C18.7694 9.34539 19.8106 10.1999 20.5432 11.2962C21.2757 12.3925 21.6667 13.6815 21.6667 15C21.6667 16.7681 20.9643 18.4638 19.7141 19.714C18.4639 20.9643 16.7682 21.6667 15.0001 21.6667ZM15.0001 11C14.2089 11 13.4356 11.2346 12.7778 11.6741C12.12 12.1136 11.6073 12.7384 11.3045 13.4693C11.0018 14.2002 10.9226 15.0044 11.0769 15.7804C11.2313 16.5563 11.6122 17.269 12.1716 17.8284C12.731 18.3878 13.4438 18.7688 14.2197 18.9231C14.9956 19.0775 15.7999 18.9983 16.5308 18.6955C17.2617 18.3928 17.8864 17.8801 18.3259 17.2223C18.7655 16.5645 19.0001 15.7911 19.0001 15C19.0001 13.9391 18.5786 12.9217 17.8285 12.1716C17.0783 11.4214 16.0609 11 15.0001 11Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default SettingsIcon;
