import { theme } from '@/configs/theme';

export const CUSTOM_SLIDER_STYLE = `
      * {
        cursor: col-resize;
      }
      .handle-container {
        width: 3px;
        transform: none;
        cursor: col-resize;
        background-color: ${theme.colors.primary_700};
      }
      .handle {
        width: 36px;
        height: 36px;
        position: fixed;
        min-width: 36px;
        max-width: 36px;
        min-height: 36px;
        max-height: 36px;
        transform: translate(calc(-48% - 0.5px), 0%);
      }
      .handle-button-wrapper {
        gap: 7px;
        width: 36px;
        height: 36px;
        display: flex;
        min-width: 36px;
        min-height: 36px;
        max-width: 36px;
        max-height: 36px;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        background-color: ${theme.colors.primary_700};
      }
      .handle-button-wrapper img:first-child {
        transform: rotate(180deg);
      }
      .first.horizontal {
        transition: all 0s ease-out;
        --keyboard-transition-time: 0s;
        --default-transition-time: 0s;
        --default-transition-time: 0s;
      }
      .divider:after {
        border-left-width: 3px;
        border-left-style: solid;
        border-left-color: ${theme.colors.primary_700};
      }
      .item-hidden {
        display: none;
      }
    `;
