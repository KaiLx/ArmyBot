package com.github.kailx.armybot.service

import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Test
import org.springframework.boot.web.client.RestTemplateBuilder

/**
 * @author KaiLx
 */
class PixivServiceTest {

    lateinit var pixivService: PixivService
    lateinit var restTemplateBuilder: RestTemplateBuilder

    @BeforeEach
    fun setup() {
//        restTemplateBuilder = Mockito.mock(RestTemplateBuilder::class.java)
        restTemplateBuilder = RestTemplateBuilder()
        pixivService = PixivService(restTemplateBuilder)
    }

    @Test
    @DisplayName("Pixivからフォローユーザーの新着作品が取得できる")
    fun getNewlyArrivedIllustration() {
        pixivService.getNewlyArrivedIllustration()
    }

}