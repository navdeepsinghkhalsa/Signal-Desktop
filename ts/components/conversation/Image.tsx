import React from 'react';
import classNames from 'classnames';

import { Localizer } from '../../types/Util';
import { AttachmentType } from './types';

interface Props {
  alt: string;
  attachment: AttachmentType;
  url: string;

  height?: number;
  width?: number;

  overlayText?: string;

  bottomOverlay?: boolean;
  closeButton?: boolean;
  curveBottomLeft?: boolean;
  curveBottomRight?: boolean;
  curveTopLeft?: boolean;
  curveTopRight?: boolean;
  darkOverlay?: boolean;
  playIconOverlay?: boolean;
  softCorners?: boolean;

  i18n: Localizer;
  onClick?: (attachment: AttachmentType) => void;
  onClickClose?: (attachment: AttachmentType) => void;
  onError?: () => void;
}

export class Image extends React.Component<Props> {
  // tslint:disable-next-line max-func-body-length cyclomatic-complexity
  public render() {
    const {
      alt,
      attachment,
      bottomOverlay,
      closeButton,
      curveBottomLeft,
      curveBottomRight,
      curveTopLeft,
      curveTopRight,
      darkOverlay,
      height,
      i18n,
      onClick,
      onClickClose,
      onError,
      overlayText,
      playIconOverlay,
      softCorners,
      url,
      width,
    } = this.props;

    const { caption } = attachment || { caption: null };

    return (
      <div
        role={onClick ? 'button' : undefined}
        onClick={() => {
          if (onClick) {
            onClick(attachment);
          }
        }}
        className={classNames(
          'module-image',
          onClick ? 'module-image__with-click-handler' : null,
          curveBottomLeft ? 'module-image--curved-bottom-left' : null,
          curveBottomRight ? 'module-image--curved-bottom-right' : null,
          curveTopLeft ? 'module-image--curved-top-left' : null,
          curveTopRight ? 'module-image--curved-top-right' : null,
          softCorners ? 'module-image--soft-corners' : null
        )}
      >
        <img
          onError={onError}
          className="module-image__image"
          alt={alt}
          height={height}
          width={width}
          src={url}
        />
        {caption ? (
          <img
            className="module-image__caption-icon"
            src="images/caption-shadow.svg"
            alt={i18n('imageCaptionIconAlt')}
          />
        ) : null}
        <div
          className={classNames(
            'module-image__border-overlay',
            curveTopLeft ? 'module-image--curved-top-left' : null,
            curveTopRight ? 'module-image--curved-top-right' : null,
            curveBottomLeft ? 'module-image--curved-bottom-left' : null,
            curveBottomRight ? 'module-image--curved-bottom-right' : null,
            softCorners ? 'module-image--soft-corners' : null,
            darkOverlay ? 'module-image__border-overlay--dark' : null
          )}
        />
        {closeButton ? (
          <div
            role="button"
            onClick={(e: React.MouseEvent<{}>) => {
              e.stopPropagation();
              if (onClickClose) {
                onClickClose(attachment);
              }
            }}
            className="module-image__close-button"
          />
        ) : null}
        {bottomOverlay ? (
          <div
            className={classNames(
              'module-image__bottom-overlay',
              curveBottomLeft ? 'module-image--curved-bottom-left' : null,
              curveBottomRight ? 'module-image--curved-bottom-right' : null
            )}
          />
        ) : null}
        {playIconOverlay ? (
          <div className="module-image__play-overlay__circle">
            <div className="module-image__play-overlay__icon" />
          </div>
        ) : null}
        {overlayText ? (
          <div
            className="module-image__text-container"
            style={{ lineHeight: `${height}px` }}
          >
            {overlayText}
          </div>
        ) : null}
      </div>
    );
  }
}
