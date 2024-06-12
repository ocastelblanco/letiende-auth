import { trigger, state, style, animate, transition, AnimationTriggerMetadata } from '@angular/animations';

export const fichaMenuAnimations: AnimationTriggerMetadata[] = [
  trigger('outOver', [
    state('out', style({ transform: 'scale(1)' })),
    state('over', style({ transform: 'scale(1.5)' })),
    transition('over <=> out', [animate('150ms ease-in-out')]),
    state('visible', style({
      height: 'auto',
      paddingBottom: '16px'
    })),
    state('invisible', style({
      height: 0,
      paddingBottom: 0
    })),
    transition('visible <=> invisible', [animate('200ms ease-in')]),
  ])
];

export const loginAnimations: AnimationTriggerMetadata[] = [
  trigger('loginCard', [
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(-100vh)'
      }),
      animate('200ms 500ms ease-out',
        style({
          opacity: 1,
          transform: 'none'
        })
      )
    ])
  ])
];