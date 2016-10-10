Make It Stop!
=============

A task based alarm app built using <a href="https://github.com/NativeScript">Nativescript</a> for people who find it hard to wake up in the morning. To stop the alarm, the user must complete a task, answer a question or complete a mini game. This app was a two week project in our final 10th and 11th weeks of the [MakersAcademy](https://github.com/makersacademy) bootcamp. Try it out on this [simulator](https://appetize.io/app/9u8mc98n64duqbtp8puja2thhm?device=iphone6&scale=75&orientation=portrait&osVersion=9.3).

Members
-------

* Sam - https://github.com/samjbro
* Luke - https://github.com/lukecartledge
* Prashant - https://github.com/prashantmathias
* Rich - https://github.com/richo225

![iphone_6_both](https://cloud.githubusercontent.com/assets/18379191/18569614/9a2a2eb8-7b9b-11e6-8d6c-79c84ea5d782.png)

Installation
------------
Please refer to the official [Nativescript documentation](http://docs.nativescript.org/angular/start/quick-setup.html) on preparing your system in detail. The following instructions are for OSX users as they will be able to use both iOS and android platforms.

To quickly set up your system for the latest NativeScript CLI, paste the following Ruby script in the terminal and hit `Enter`:

```
$ sudo ruby -e "$(curl -fsSL https://www.nativescript.org/setup/mac)"
```
Install the Nativescript CLI:
```
$ npm install nativescript -g
```
Check that everything is setup correctly:
```
$ tns doctor
```

Running the app
---------------
Clone the repository to your local machine:
```
$ git clone https://github.com/MakeItStop/task-based-alarm
$ cd task-based-alarm
```
Make sure you have all the app dependencies:
```
$ npm install
```
Add the Android and iOS platforms to the project:
```
$ tns platform add android
$ tns platform add ios
```
Run and enjoy MakeItStop! on the iPhone/android emulators:
```
$ tns run ios --emulator
$ tns run android --emulator
```

Demonstration
-------------
[![MakeItStop! Demo](https://cloud.githubusercontent.com/assets/18379191/18570175/c467eb58-7b9f-11e6-8957-2f55b19d0b72.png)](https://www.youtube.com/watch?v=WGuyOzGttv0 "MakeItStop! Demo")

User stories
------------

### MVP 1
```
As a very sleepy User
So that I can wake up on time
I want my phone to play a loud noise at a specified time

As a very sleepy User
So that I stay awake
I want the phone noise to be continuous

As a very sleepy User
So that I can wake up at a specific time
I would like to be able to set a time to wake up

As a very sleepy User
When I am already awake
I would like to be able to switch the alarm off

As a very sleepy User
So that I can update my wake up time
I would like to be able to edit the time

As a very sleepy User
So that I don't get woken up on the weekend
I would like to be able to delete an alarm

As a very sleepy User
So that I can see how much sleep I have left
I would like to view the alarm
```

### MVP 2
```
As a very sleepy User
So that I can't switch an alarm off easily
I would like to complete a task in order to switch it off

```

### MVP 3
```
As a very sleepy User
So that I can decide how easy it is for me to stay awake
I would like to be able to choose from a task list

As a very sleepy User
So that I cdon't have to pick a task
I would like to have a random task

As a very sleepy User
So that I can decide how I'd like to be woken up
I would like to be able to choose from an alarm sound list

As a very sleepy User
So that I don't have to pick a sound choice
I would like to have a random alarm sound

```
### MVP 4
```
As a very sleepy User
So that I can further decide how easy it is for me to stay awake
I would like to be able to choose a task difficulty

```

Technologies
------------
![nativescript_angular_logo](https://cloud.githubusercontent.com/assets/18379191/18570933/4a2f32a4-7ba6-11e6-9ad6-d91bfcd3a471.png)
* Nativescript
* Angular 2
* Typescript
* HTML5
* CSS
* Jasmine
* Javascript

Future implementations
----------------------

Features
------------------
* Point system
* Incentives (snooze fines, task difficulties)
* Leaderboard
* Social - connect with fb friends
* Facebook login
* Post to Facebook(score)
* Health graph API - how much sleep you get - tracker
* Choice of alarm tune
* Motivational messages? (Rock)
* Upload to app/play store

Tasks
------
* Riddles
* Accelerometer
* GPS
* Capture - picture matching
* Must take a picture of a specific location
