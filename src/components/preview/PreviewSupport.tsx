import { Component, type ReactNode } from 'react';
import type { PreviewMode } from './PreviewShell';
import { PREVIEW_MODE_EVENT } from './PreviewShell';
import { asset } from '../../lib/asset';
import { MediaImage } from '../ui/MediaImage';

/** Static fallback shown if the interactive preview fails to start. */
export function PreviewFallback({ reason }: { reason: 'nojs' | 'error' }) {
  return (
    <figure className="preview-fallback">
      <MediaImage
        src={asset('media/screens/wall-overview-1600.jpg')}
        srcSet={`${asset('media/screens/wall-overview-800.jpg')} 800w, ${asset('media/screens/wall-overview-1600.jpg')} 1600w`}
        sizes="(min-width: 1240px) 1160px, 94vw"
        width="1600"
        height="970"
        alt="The Frameshelf Wall showing a grid of video and image thumbnails with filenames, a sidebar of Shelves, Boards and Tags, and a filename search field"
        loading="lazy"
      />
      <figcaption>
        {reason === 'nojs'
          ? 'The interactive preview needs JavaScript. This is the Frameshelf Wall with sample media.'
          : 'The interactive preview could not start. This is the Frameshelf Wall with sample media.'}
      </figcaption>
    </figure>
  );
}

interface BoundaryState {
  failed: boolean;
}

export class PreviewBoundary extends Component<{ children: ReactNode }, BoundaryState> {
  override state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  override render() {
    return this.state.failed ? (
      <div className="preview-frame">
        <PreviewFallback reason="error" />
      </div>
    ) : (
      this.props.children
    );
  }
}

/** In-page link that scrolls to the preview and opens a given mode. */
export function PreviewModeLink({ mode, children }: { mode: PreviewMode; children: ReactNode }) {
  return (
    <a
      className="text-link"
      href="#preview"
      onClick={() => window.dispatchEvent(new CustomEvent(PREVIEW_MODE_EVENT, { detail: mode }))}
    >
      {children}
      <span aria-hidden="true"> →</span>
    </a>
  );
}
