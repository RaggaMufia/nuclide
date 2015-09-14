'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */


var {DebuggerProcessInfo} = require('nuclide-debugger-utils');
class ProcessInfo extends DebuggerProcessInfo
{
  _remoteDirectoryPath: string;

  constructor(remoteDirectoryPath: string) {
    super('hhvm');

    this._remoteDirectoryPath = remoteDirectoryPath;
  }

  attach(): DebuggerProcess {
    var DebuggerProcess = require('./DebuggerProcess');
    return new DebuggerProcess(this._remoteDirectoryPath);
  }

  launch(launchTarget: string) {
    var DebuggerProcess = require('./DebuggerProcess');
    return new DebuggerProcess(this._remoteDirectoryPath, launchTarget);
  }

  compareDetails(other: ProcessInfo): number {
    return compareString(this._remoteDirectoryPath, other._remoteDirectoryPath);
  }

  displayString(): string {
    var remoteUri = require('nuclide-remote-uri');
    return remoteUri.getHostname(this._remoteDirectoryPath);
  }
}

function compareString(value1: string, value2: string): number {
  return value1 === value2 ? 0 : (value1 < value2 ? -1 : 1);
}

module.exports = ProcessInfo;
