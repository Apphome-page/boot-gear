export default function AmpGlobalStyles() {
  return (
    <>
      <style jsx global>
        {`
          /*
          * Custom Bootstrap Additions
          */
          html {
            -webkit-text-size-adjust: 100%;
            -webkit-tap-highlight-color: transparent;
          }
          body {
            margin: 0;
            font-family: 'Montserrat', sans-serif;
            font-size: 16px;
            font-weight: 400;
            line-height: 30px;
            color: #50668f;
            text-align: left;
            background-color: #fff;
          }
          textarea {
            resize: none;
          }
          em {
            font-weight: 600;
          }
          small {
            color: #666;
            font-size: 12px;
            font-weight: 400;
          }
          a {
            color: unset;
            text-decoration: none;
          }
          a:hover {
            filter: opacity(0.6);
          }
          .tight-wrap {
            display: inline-block;
            outline: 0;
            font-size: 0;
            line-height: 0;
          }
          .cursor-pointer {
            cursor: pointer;
          }
          .mini {
            font-size: 12px;
            line-height: 1.4;
            letter-spacing: 1px;
          }
          .bg-alt {
            background-image: linear-gradient(110deg, #7b10ff 0, #974fff 100%);
            background-color: #f2f5fa;
          }
          .btn.btn-alt {
            padding: 12px 32px;
            border: 0;
            border-radius: 0;
            background-image: linear-gradient(110deg, #7b10ff 0, #974fff 100%);
            background-color: #7b10ff;
            color: #fff;
          }
          .btn.btn-alt:hover,
          .btn.btn-alt:focus {
            background: #f2f5fa;
            color: #1e283c;
          }
          .btn.btn-alt2 {
            padding: 12px 32px;
            border: 0;
            border-radius: 0;
            background: #f2f5fa;
            color: #1e283c;
          }
          .btn.btn-alt2:hover,
          .btn.btn-alt2:focus {
            background-image: linear-gradient(110deg, #7b10ff 0, #974fff 100%);
            background-color: #7b10ff;
            color: #fff;
          }
        `}
      </style>
      <style jsx global>
        {`
          /*!
          * Bootstrap v4.6.0 (https://getbootstrap.com/)
          * Copyright 2011-2021 The Bootstrap Authors
          * Copyright 2011-2021 Twitter, Inc.
          * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
          */
          *,
          ::after,
          ::before {
            box-sizing: border-box;
          }
          section {
            display: block;
          }
          [tabindex='-1']:focus:not(:focus-visible) {
            outline: 0;
          }
          h1 {
            margin-top: 0;
            margin-bottom: 0.5rem;
          }
          p {
            margin-top: 0;
            margin-bottom: 1rem;
          }
          img {
            vertical-align: middle;
            border-style: none;
          }
          svg {
            overflow: hidden;
            vertical-align: middle;
          }
          button {
            border-radius: 0;
          }
          button:focus:not(:focus-visible) {
            outline: 0;
          }
          button {
            margin: 0;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
          }
          button {
            overflow: visible;
          }
          button {
            text-transform: none;
          }
          [type='button'],
          button {
            -webkit-appearance: button;
          }
          [type='button']:not(:disabled),
          [type='reset']:not(:disabled),
          [type='submit']:not(:disabled),
          button:not(:disabled) {
            cursor: pointer;
          }
          [type='button']::-moz-focus-inner,
          button::-moz-focus-inner {
            padding: 0;
            border-style: none;
          }
          ::-webkit-file-upload-button {
            font: inherit;
            -webkit-appearance: button;
          }
          .h1,
          .h2,
          .h5,
          h1 {
            margin-bottom: 0.5rem;
            font-weight: 500;
            line-height: 1.2;
          }
          .h1,
          h1 {
            font-size: 2.5rem;
          }
          .h2 {
            font-size: 2rem;
          }
          .h5 {
            font-size: 1.25rem;
          }
          .lead {
            font-size: 1.25rem;
            font-weight: 300;
          }
          .display-4 {
            font-size: 3.5rem;
            font-weight: 300;
            line-height: 1.2;
          }
          .container,
          .container-fluid {
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
            margin-right: auto;
            margin-left: auto;
          }
          @media (min-width: 576px) {
            .container {
              max-width: 540px;
            }
          }
          @media (min-width: 768px) {
            .container {
              max-width: 720px;
            }
          }
          @media (min-width: 992px) {
            .container {
              max-width: 960px;
            }
          }
          @media (min-width: 1200px) {
            .container {
              max-width: 1140px;
            }
          }
          .row {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: -15px;
            margin-left: -15px;
          }
          .col,
          .col-lg-12,
          .col-lg-3,
          .col-lg-4,
          .col-lg-6,
          .col-lg-8 {
            position: relative;
            width: 100%;
            padding-right: 15px;
            padding-left: 15px;
          }
          .col {
            -ms-flex-preferred-size: 0;
            flex-basis: 0;
            -ms-flex-positive: 1;
            flex-grow: 1;
            max-width: 100%;
          }
          @media (min-width: 992px) {
            .col-lg-3 {
              -ms-flex: 0 0 25%;
              flex: 0 0 25%;
              max-width: 25%;
            }
            .col-lg-4 {
              -ms-flex: 0 0 33.333333%;
              flex: 0 0 33.333333%;
              max-width: 33.333333%;
            }
            .col-lg-6 {
              -ms-flex: 0 0 50%;
              flex: 0 0 50%;
              max-width: 50%;
            }
            .col-lg-8 {
              -ms-flex: 0 0 66.666667%;
              flex: 0 0 66.666667%;
              max-width: 66.666667%;
            }
            .col-lg-12 {
              -ms-flex: 0 0 100%;
              flex: 0 0 100%;
              max-width: 100%;
            }
          }
          .custom-control-input.is-valid:focus:not(:checked)
            ~ .custom-control-label::before,
          .was-validated
            .custom-control-input:valid:focus:not(:checked)
            ~ .custom-control-label::before {
            border-color: #28a745;
          }
          .custom-control-input.is-invalid:focus:not(:checked)
            ~ .custom-control-label::before,
          .was-validated
            .custom-control-input:invalid:focus:not(:checked)
            ~ .custom-control-label::before {
            border-color: #dc3545;
          }
          .btn {
            display: inline-block;
            font-weight: 400;
            color: #212529;
            text-align: center;
            vertical-align: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            background-color: transparent;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            font-size: 1rem;
            line-height: 1.5;
            border-radius: 0.25rem;
            transition: color 0.15s ease-in-out,
              background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
              box-shadow 0.15s ease-in-out;
          }
          @media (prefers-reduced-motion: reduce) {
            .btn {
              transition: none;
            }
          }
          .btn:hover {
            color: #212529;
            text-decoration: none;
          }
          .btn:focus {
            outline: 0;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          }
          .btn:disabled {
            opacity: 0.65;
          }
          .btn:not(:disabled):not(.disabled) {
            cursor: pointer;
          }
          .btn-primary:not(:disabled):not(.disabled).active,
          .btn-primary:not(:disabled):not(.disabled):active {
            color: #fff;
            background-color: #0062cc;
            border-color: #005cbf;
          }
          .btn-primary:not(:disabled):not(.disabled).active:focus,
          .btn-primary:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
          }
          .btn-secondary:not(:disabled):not(.disabled).active,
          .btn-secondary:not(:disabled):not(.disabled):active {
            color: #fff;
            background-color: #545b62;
            border-color: #4e555b;
          }
          .btn-secondary:not(:disabled):not(.disabled).active:focus,
          .btn-secondary:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(130, 138, 145, 0.5);
          }
          .btn-success:not(:disabled):not(.disabled).active,
          .btn-success:not(:disabled):not(.disabled):active {
            color: #fff;
            background-color: #1e7e34;
            border-color: #1c7430;
          }
          .btn-success:not(:disabled):not(.disabled).active:focus,
          .btn-success:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(72, 180, 97, 0.5);
          }
          .btn-info:not(:disabled):not(.disabled).active,
          .btn-info:not(:disabled):not(.disabled):active {
            color: #fff;
            background-color: #117a8b;
            border-color: #10707f;
          }
          .btn-info:not(:disabled):not(.disabled).active:focus,
          .btn-info:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(58, 176, 195, 0.5);
          }
          .btn-warning:not(:disabled):not(.disabled).active,
          .btn-warning:not(:disabled):not(.disabled):active {
            color: #212529;
            background-color: #d39e00;
            border-color: #c69500;
          }
          .btn-warning:not(:disabled):not(.disabled).active:focus,
          .btn-warning:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(222, 170, 12, 0.5);
          }
          .btn-danger:not(:disabled):not(.disabled).active,
          .btn-danger:not(:disabled):not(.disabled):active {
            color: #fff;
            background-color: #bd2130;
            border-color: #b21f2d;
          }
          .btn-danger:not(:disabled):not(.disabled).active:focus,
          .btn-danger:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(225, 83, 97, 0.5);
          }
          .btn-light {
            color: #212529;
            background-color: #f8f9fa;
            border-color: #f8f9fa;
          }
          .btn-light:hover {
            color: #212529;
            background-color: #e2e6ea;
            border-color: #dae0e5;
          }
          .btn-light:focus {
            color: #212529;
            background-color: #e2e6ea;
            border-color: #dae0e5;
            box-shadow: 0 0 0 0.2rem rgba(216, 217, 219, 0.5);
          }
          .btn-light:disabled {
            color: #212529;
            background-color: #f8f9fa;
            border-color: #f8f9fa;
          }
          .btn-light:not(:disabled):not(.disabled).active,
          .btn-light:not(:disabled):not(.disabled):active {
            color: #212529;
            background-color: #dae0e5;
            border-color: #d3d9df;
          }
          .btn-light:not(:disabled):not(.disabled).active:focus,
          .btn-light:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(216, 217, 219, 0.5);
          }
          .btn-dark:not(:disabled):not(.disabled).active,
          .btn-dark:not(:disabled):not(.disabled):active {
            color: #fff;
            background-color: #1d2124;
            border-color: #171a1d;
          }
          .btn-dark:not(:disabled):not(.disabled).active:focus,
          .btn-dark:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(82, 88, 93, 0.5);
          }
          .btn-outline-primary:not(:disabled):not(.disabled).active,
          .btn-outline-primary:not(:disabled):not(.disabled):active {
            color: #fff;
            background-color: #007bff;
            border-color: #007bff;
          }
          .btn-outline-primary:not(:disabled):not(.disabled).active:focus,
          .btn-outline-primary:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
          }
          .btn-outline-secondary:not(:disabled):not(.disabled).active,
          .btn-outline-secondary:not(:disabled):not(.disabled):active {
            color: #fff;
            background-color: #6c757d;
            border-color: #6c757d;
          }
          .btn-outline-secondary:not(:disabled):not(.disabled).active:focus,
          .btn-outline-secondary:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(108, 117, 125, 0.5);
          }
          .btn-outline-success:not(:disabled):not(.disabled).active,
          .btn-outline-success:not(:disabled):not(.disabled):active {
            color: #fff;
            background-color: #28a745;
            border-color: #28a745;
          }
          .btn-outline-success:not(:disabled):not(.disabled).active:focus,
          .btn-outline-success:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.5);
          }
          .btn-outline-info:not(:disabled):not(.disabled).active,
          .btn-outline-info:not(:disabled):not(.disabled):active {
            color: #fff;
            background-color: #17a2b8;
            border-color: #17a2b8;
          }
          .btn-outline-info:not(:disabled):not(.disabled).active:focus,
          .btn-outline-info:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(23, 162, 184, 0.5);
          }
          .btn-outline-warning:not(:disabled):not(.disabled).active,
          .btn-outline-warning:not(:disabled):not(.disabled):active {
            color: #212529;
            background-color: #ffc107;
            border-color: #ffc107;
          }
          .btn-outline-warning:not(:disabled):not(.disabled).active:focus,
          .btn-outline-warning:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, 0.5);
          }
          .btn-outline-danger:not(:disabled):not(.disabled).active,
          .btn-outline-danger:not(:disabled):not(.disabled):active {
            color: #fff;
            background-color: #dc3545;
            border-color: #dc3545;
          }
          .btn-outline-danger:not(:disabled):not(.disabled).active:focus,
          .btn-outline-danger:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.5);
          }
          .btn-outline-light {
            color: #f8f9fa;
            border-color: #f8f9fa;
          }
          .btn-outline-light:hover {
            color: #212529;
            background-color: #f8f9fa;
            border-color: #f8f9fa;
          }
          .btn-outline-light:focus {
            box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);
          }
          .btn-outline-light:disabled {
            color: #f8f9fa;
            background-color: transparent;
          }
          .btn-outline-light:not(:disabled):not(.disabled).active,
          .btn-outline-light:not(:disabled):not(.disabled):active {
            color: #212529;
            background-color: #f8f9fa;
            border-color: #f8f9fa;
          }
          .btn-outline-light:not(:disabled):not(.disabled).active:focus,
          .btn-outline-light:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(248, 249, 250, 0.5);
          }
          .btn-outline-dark:not(:disabled):not(.disabled).active,
          .btn-outline-dark:not(:disabled):not(.disabled):active {
            color: #fff;
            background-color: #343a40;
            border-color: #343a40;
          }
          .btn-outline-dark:not(:disabled):not(.disabled).active:focus,
          .btn-outline-dark:not(:disabled):not(.disabled):active:focus {
            box-shadow: 0 0 0 0.2rem rgba(52, 58, 64, 0.5);
          }
          .custom-control-input:focus:not(:checked)
            ~ .custom-control-label::before {
            border-color: #80bdff;
          }
          .custom-control-input:not(:disabled):active
            ~ .custom-control-label::before {
            color: #fff;
            background-color: #b3d7ff;
            border-color: #b3d7ff;
          }
          .card {
            position: relative;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(0, 0, 0, 0.125);
            border-radius: 0.25rem;
          }
          .card > .list-group {
            border-top: inherit;
            border-bottom: inherit;
          }
          .card-body {
            -ms-flex: 1 1 auto;
            flex: 1 1 auto;
            min-height: 1px;
            padding: 1.25rem;
          }
          .card-title {
            margin-bottom: 0.75rem;
          }
          .card-text:last-child {
            margin-bottom: 0;
          }
          .card-deck .card {
            margin-bottom: 15px;
          }
          @media (min-width: 576px) {
            .card-deck {
              display: -ms-flexbox;
              display: flex;
              -ms-flex-flow: row wrap;
              flex-flow: row wrap;
              margin-right: -15px;
              margin-left: -15px;
            }
            .card-deck .card {
              -ms-flex: 1 0 0%;
              flex: 1 0 0%;
              margin-right: 15px;
              margin-bottom: 0;
              margin-left: 15px;
            }
          }
          .media {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: start;
            align-items: flex-start;
          }
          .media-body {
            -ms-flex: 1;
            flex: 1;
          }
          .list-group {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-direction: column;
            flex-direction: column;
            padding-left: 0;
            margin-bottom: 0;
            border-radius: 0.25rem;
          }
          .list-group-item {
            position: relative;
            display: block;
            padding: 0.75rem 1.25rem;
            background-color: #fff;
            border: 1px solid rgba(0, 0, 0, 0.125);
          }
          .list-group-item:first-child {
            border-top-left-radius: inherit;
            border-top-right-radius: inherit;
          }
          .list-group-item:last-child {
            border-bottom-right-radius: inherit;
            border-bottom-left-radius: inherit;
          }
          .list-group-item:disabled {
            color: #6c757d;
            pointer-events: none;
            background-color: #fff;
          }
          .list-group-item + .list-group-item {
            border-top-width: 0;
          }
          .list-group-flush {
            border-radius: 0;
          }
          .list-group-flush > .list-group-item {
            border-width: 0 0 1px;
          }
          .list-group-flush > .list-group-item:last-child {
            border-bottom-width: 0;
          }
          .close:not(:disabled):not(.disabled):focus,
          .close:not(:disabled):not(.disabled):hover {
            opacity: 0.75;
          }
          .bg-warning {
            background-color: #ffc107;
          }
          .bg-danger {
            background-color: #dc3545;
          }
          .bg-light {
            background-color: #f8f9fa;
          }
          .bg-dark {
            background-color: #343a40;
          }
          .bg-white {
            background-color: #fff;
          }
          .border {
            border: 1px solid #dee2e6;
          }
          .border-top {
            border-top: 1px solid #dee2e6;
          }
          .border-bottom {
            border-bottom: 1px solid #dee2e6;
          }
          .border-0 {
            border: 0;
          }
          .border-dark {
            border-color: #343a40;
          }
          .rounded-top {
            border-top-left-radius: 0.25rem;
            border-top-right-radius: 0.25rem;
          }
          .rounded-circle {
            border-radius: 50%;
          }
          .rounded-0 {
            border-radius: 0;
          }
          .d-none {
            display: none;
          }
          .d-inline-block {
            display: inline-block;
          }
          .d-block {
            display: block;
          }
          .d-flex {
            display: -ms-flexbox;
            display: flex;
          }
          @media (min-width: 992px) {
            .d-lg-block {
              display: block;
            }
          }
          .align-items-center {
            -ms-flex-align: center;
            align-items: center;
          }
          @supports ((position: -webkit-sticky) or (position: sticky)) {
            .sticky-top {
              position: -webkit-sticky;
              position: sticky;
              top: 0;
              z-index: 1020;
            }
          }
          .shadow {
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          }
          .w-100 {
            width: 100%;
          }
          .my-1 {
            margin-top: 0.25rem;
          }
          .mr-1,
          .mx-1 {
            margin-right: 0.25rem;
          }
          .my-1 {
            margin-bottom: 0.25rem;
          }
          .ml-1,
          .mx-1 {
            margin-left: 0.25rem;
          }
          .mt-3,
          .my-3 {
            margin-top: 1rem;
          }
          .mb-3,
          .my-3 {
            margin-bottom: 1rem;
          }
          .m-5 {
            margin: 3rem;
          }
          .my-5 {
            margin-top: 3rem;
          }
          .mb-5,
          .my-5 {
            margin-bottom: 3rem;
          }
          .p-1 {
            padding: 0.25rem;
          }
          .py-1 {
            padding-top: 0.25rem;
          }
          .py-1 {
            padding-bottom: 0.25rem;
          }
          .p-3 {
            padding: 1rem;
          }
          .py-3 {
            padding-top: 1rem;
          }
          .px-3 {
            padding-right: 1rem;
          }
          .pb-3,
          .py-3 {
            padding-bottom: 1rem;
          }
          .px-3 {
            padding-left: 1rem;
          }
          .pt-5,
          .py-5 {
            padding-top: 3rem;
          }
          .px-5 {
            padding-right: 3rem;
          }
          .py-5 {
            padding-bottom: 3rem;
          }
          .px-5 {
            padding-left: 3rem;
          }
          @media (min-width: 576px) {
            .mt-sm-0 {
              margin-top: 0;
            }
            .mb-sm-0 {
              margin-bottom: 0;
            }
            .mr-sm-3 {
              margin-right: 1rem;
            }
          }
          .text-truncate {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .text-right {
            text-align: right;
          }
          .text-center {
            text-align: center;
          }
          .font-weight-bold {
            font-weight: 700;
          }
          .text-white {
            color: #fff;
          }
          .text-secondary {
            color: #6c757d;
          }
          .text-dark {
            color: #343a40;
          }
          a.text-dark:focus,
          a.text-dark:hover {
            color: #121416;
          }
          .text-muted {
            color: #6c757d;
          }
          .text-white-50 {
            color: rgba(255, 255, 255, 0.5);
          }
          .text-decoration-none {
            text-decoration: none;
          }
          @media print {
            *,
            ::after,
            ::before {
              text-shadow: none;
              box-shadow: none;
            }
            a:not(.btn) {
              text-decoration: underline;
            }
            img {
              page-break-inside: avoid;
            }
            p {
              orphans: 3;
              widows: 3;
            }
            @page {
              size: a3;
            }
            body {
              min-width: 992px;
            }
            .container {
              min-width: 992px;
            }
          }
          /*# sourceMappingURL=bootstrap.min.css.map */
        `}
      </style>
    </>
  )
}
