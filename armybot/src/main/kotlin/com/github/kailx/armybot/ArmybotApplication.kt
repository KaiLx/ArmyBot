package com.github.kailx.armybot

import com.github.kailx.armybot.config.SlackbotProperties
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("test")
@SpringBootApplication
class ArmybotApplication(val slackbotProperties: SlackbotProperties) {
    @GetMapping
    fun test(): String = slackbotProperties.token
}

fun main(args: Array<String>) {
    SpringApplication.run(ArmybotApplication::class.java, *args)
}
